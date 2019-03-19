import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { DataListComponent } from './data-list.component';

describe('DataListComponent', () => {
  let component: DataListComponent;
  let fixture: ComponentFixture<DataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableDataSource, MatTableModule],
      declarations: [DataListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
