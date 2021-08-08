import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
users: User[];
userForm : FormGroup;
filterForm: FormGroup;

maleSelected = false;
femaleSelected =false;

addNewUser() {

  let userjson: User = this.userForm.getRawValue();
  userjson.id = this.users.length + 1;
  userjson.visible = true;
  this.users.push(userjson);
  this.userForm.reset();
}

genderFilter() {

  if(this.maleSelected || this.femaleSelected) {
    for(let user of this.users){
      if(this.maleSelected && user.gender == 'Male') {
        user.visible = true;
      } if(this.femaleSelected && user.gender == 'Female') {
        user.visible = true;
      } else {
        user.visible = false;
      }
    }
  } else {
      for(let user of this.users)
      {
          user.visible = true;
      }
    }
  }

  constructor(fb: FormBuilder)
  {
    this.userForm = fb.group({
    id: [],
    first_name: [],
    last_name: [],
    email: [],
    gender: [],
    visible:[]
    });
  

      this.filterForm= fb.group({
        male: [],
        female: [],
        q:[]
      })

this.filterForm.controls['q'].valueChanges.subscribe(v => {
  for(let user of this.users) {
    if(
      !(
        user.first_name.includes(v) ||
        user.last_name.includes(v) || 
        user.email.includes(v)
      )
    )
    {
      user.visible = false;
    } else {
      user.visible = true;
    }
  }
});

this.filterForm.controls['male'].valueChanges.subscribe(v => {
  this.maleSelected = v;
  this.genderFilter();
});

this.filterForm.controls['female'].valueChanges.subscribe(v => {
  this.femaleSelected = v;
  this.genderFilter();
});

this.users = [
  {
    id: 1,
    first_name: 'Jeanette',
    last_name: 'Penddreth',
    email: 'jpenddreth0@census.gov',
    gender: 'Female',
    visible : true
    }, {
    id: 2,
    first_name: 'Giavani',
    last_name: 'Frediani',
    email: 'gfrediani1@senate.gov',
    gender: 'Male',
    visible : true
    }, {
    id: 3,
    first_name: 'Noell',
    last_name: 'Bea',
    email: 'nbea2@imageshack.us',
    gender: 'Female',
    visible : true
    }, {
    id: 4,
    first_name: 'Willard',
    last_name: 'Valek',
    email: 'wvalek3@vk.com',
    gender: 'Male',
    visible : true
    }
  ];
  }
}

class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  visible : boolean;

}
















































  

























