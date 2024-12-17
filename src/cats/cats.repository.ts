import { Injectable } from '@nestjs/common';

import { Cat } from './cat.interfaces';

@Injectable()
export class CatsRepository {
  private cats: Cat[] = [];
  private idCounter = 1;

  create(cat: Omit<Cat, 'id'>): Cat {
    const newCat = { ...cat, id: this.idCounter++ };
    this.cats.push(newCat);
    return newCat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat | undefined {
    return this.cats.find((cat) => cat.id === id);
  }

  update(id: number, updatedCat: Partial<Cat>): Cat | undefined {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);
    if (catIndex === -1) {
      return undefined;
    }

    this.cats[catIndex] = { ...this.cats[catIndex], ...updatedCat };
    return this.cats[catIndex];
  }
}
