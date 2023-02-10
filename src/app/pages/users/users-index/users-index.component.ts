import { UserFormComponent } from './../user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from './../../../auth/interfaces/api-reqres.interfaces';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { DialogAlertComponent } from 'src/app/shared/components/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css'],
})
export class UsersIndexComponent implements OnInit {
  public users: IUser[] = [];

  public displayedColumns = [
    'id',
    'first_name',
    'last_name',
    'email',
    'telephone_number',
    'rol',
    'actions',
  ];

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getAll().subscribe({
      next: (resp: IUser[]) => {
        this.users = resp;
      },
      error: (err) => console.log(err),
    });
  }

  openDialogUserForm(user_id?: number) {
    let title = user_id ? 'Editar usuario' : 'Crear usuario';

    const dialogRef = this.dialog.open(UserFormComponent, {
      data: {
        title,
        user_id,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (user_id) {
          this.usersService
            .update(user_id, data)
            .subscribe(() => this.getUsers());
        } else {
          this.usersService.create(data).subscribe(() => this.getUsers());
        }
      }
    });
  }

  deleteUser(id: number) {
    this.usersService.delete(id).subscribe(() => {
      this.getUsers();

      this.dialog.open(DialogAlertComponent, {
        data: {
          message: 'Usuario eliminado correctamente'
        }
      })
    });
  }
}
