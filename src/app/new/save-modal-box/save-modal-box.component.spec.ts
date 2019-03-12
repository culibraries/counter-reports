import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveModalBoxComponent } from './save-modal-box.component';

describe('SaveModalBoxComponent', () => {
  let component: SaveModalBoxComponent;
  let fixture: ComponentFixture<SaveModalBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveModalBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveModalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
