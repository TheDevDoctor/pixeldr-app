import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbOAuth2CallbackComponent } from './nb-oauth2-callback.component';

describe('NbOAuth2CallbackComponent', () => {
  let component: NbOAuth2CallbackComponent;
  let fixture: ComponentFixture<NbOAuth2CallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbOAuth2CallbackComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbOAuth2CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
