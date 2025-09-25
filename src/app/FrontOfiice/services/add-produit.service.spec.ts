import { TestBed } from '@angular/core/testing';

import { AddProduitService } from './add-produit.service';

describe('AddProduitService', () => {
  let service: AddProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
