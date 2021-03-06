import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  defaultAvatar = 'https://sumeks.co/assets/foto/2020/05/0-superman-M.jpg';
  // tslint:disable-next-line:variable-name
  private _userData: Observable<firebase.User>;

  private currentUser: UserData;
  private currentUser$ = new BehaviorSubject<UserData>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this._userData = afAuth.authState;

    this._userData.subscribe((user) => {
      if (user) {
        this.afs
          .collection<UserData>("users")
          .doc<UserData>(user.uid)
          .valueChanges()
          .subscribe((currentUser) => {
            this.currentUser = currentUser;
            this.currentUser$.next(currentUser);
          });
      }
    });
  }

  CurrentUser(): Observable<UserData> {
    return this.currentUser$.asObservable();
  }

  SignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res) {
          if (avatar == undefined || avatar == '') {
            avatar = this.defaultAvatar;
          }
          this.afs
            .collection("users")
            .doc(res.user.uid)
            .set({
              firstName,
              lastName,
              email,
              avatar,
            })
            .then((value) => {
              this.afs
                .collection<UserData>("users")
                .doc<UserData>(res.user.uid)
                .valueChanges()
                .subscribe((user) => {
                  console.log(user);
                  if (user) {
                    this.currentUser$.next(user);
                  }
                });
            });
        }
      })
      .catch((err) => console.log(`Something went wrong ${err.message}`));
  }

  get userData(): Observable<firebase.User> {
    return this._userData;
  }

  SignIn(email: string, password: string): void {
    console.log(email, password);

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        this._userData = this.afAuth.authState;

        this.afs
          .collection<UserData>("users")
          .doc<UserData>(res.user.uid)
          .valueChanges()
          .subscribe((user) => {
            console.log(user);
            // @ts-ignore
            this.currentUser = user;
            this.currentUser$.next(this.currentUser);
          });
      })
      .catch((err) => console.log(err.message));
  }

  Logout(): void {
    this.afAuth.auth.signOut().then((res) => {
      console.log(res);
      this.currentUser = null;
      this.currentUser$.next(this.currentUser);
      this.router.navigateByUrl("/login").then();
    });
  }

  searchUserInDatabase(user_id: string): Observable<UserData> {
    return this.afs
      .collection<UserData>("users")
      .doc<UserData>(user_id)
      .valueChanges();
  }
}

export interface UserData {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  id?: string;
}
