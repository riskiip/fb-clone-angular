import { Component, OnDestroy, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.subs.push(
      this.authService.userData.subscribe((user) => {
        if (user) {
          this.router.navigateByUrl("").then();
        }
      })
    );
  }

  onLogin(form: NgForm) {
    const { email, password } = form.value;

    if (!form.valid) {
      return;
    }

    this.authService.SignIn(email, password);
    form.resetForm();
  }

  onRegister() {
    const dialogRef: MatDialogRef<RegisterComponent, any> = this.matDialog.open(
      RegisterComponent,
      {
        role: "dialog",
        height: "480px",
        width: "480px",
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      const { firstName, lastName, email, password, avatar } = res;
      console.log(res);
      if (res != undefined) {
        this.authService.SignUp(email, password, firstName, lastName, avatar);
      } else {
        return;
      }
    });
    return;
  }

  ngOnDestroy() {
    this.subs.map((s) => s.unsubscribe);
  }
}
