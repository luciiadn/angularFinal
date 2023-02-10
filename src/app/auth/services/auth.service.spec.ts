import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user.model';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

const expectedUserAdmin = new User(
  7,
  'michael.lawson@reqres.in',
  'Michael',
  'Lawson',
  'https://reqres.in/img/faces/7-image.jpg',
  'ADMIN'
);

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to login and return user data', () => {
    const userLoggin = {
      email: 'test@example.com',
      password: 'password',
      rol: 'admin',
    };

    const userDto = {
      data: {
        id: 1,
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'https://example.com/avatar.jpg',
      },
    };
    const user = new User(
      userDto.data.id,
      userDto.data.email,
      userDto.data.first_name,
      userDto.data.last_name,
      userDto.data.avatar,
      userLoggin.rol
    );

    service.login(userLoggin).subscribe((data) => {
      expect(data).toEqual(user);
    });

    const req = httpTestingController.expectOne(service.api_auth_url + 'login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'token' });

    const req2 = httpTestingController.expectOne(
      service.api_auth_url + 'users/5'
    );
    expect(req2.request.method).toBe('GET');
    req2.flush(userDto);
  });
});
