import { TestBed, async } from '@angular/core/testing';
import { UserService } from './user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CoursesService } from './courses.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let mockHttp:HttpTestingController;
  let userService:UserService;
  
  beforeEach(async(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [{ provide: CoursesService}]
  })));

  it('should be created', () => {
    userService = TestBed.get(UserService);
    expect(userService).toBeTruthy();
  });
});
