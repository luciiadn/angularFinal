import { UsersServiceMock } from './../../../mocks/users.service.mock';
import { UsersService } from './../../../services/users.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { UsersIndexComponent } from './users-index.component';

xdescribe('UsersIndexComponent', () => {
  let component: UsersIndexComponent;
  let fixture: ComponentFixture<UsersIndexComponent>;

  let spyLoadUsers: jasmine.Spy;
  let usersService: UsersService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersIndexComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceMock

        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersIndexComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    spyLoadUsers = spyOn(usersService, 'getUsers').and.callThrough()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar los usuarios al inicio', () => {

    component.ngOnInit();

    expect(spyLoadUsers).toHaveBeenCalled()


  });



});
