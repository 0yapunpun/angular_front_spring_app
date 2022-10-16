import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatesService } from './services/states/states.service';
import { CountriesService } from './services/countries/countries.service';
import { PersonService } from './services/person/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  personForm: FormGroup;
  countries: any;
  states: any;
  persons: any;

  constructor(
    public fb: FormBuilder,
    public stateService: StatesService,
    public countriesService: CountriesService,
    public personService: PersonService
  ) {

  }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required]
    })

    this.countriesService.getAllCountries().subscribe(
      res => {
        this.countries = res;
      },
      err => { console.log(err) },
    );


    this.personService.getAllPersons().subscribe(
      res => {
        this.persons = res;
      },
      err => { console.log(err) },
    );

    this.personForm.get('country').valueChanges.subscribe(
      res => {

        this.stateService.getStates(res.id).subscribe(
          res => {
            this.states = res;
          },
          err => { console.log(err) }
        )

      },
      err => {console.log(err)}
    )


  }

  savePerson(): void {
    this.personService.savePerson(this.personForm.value).subscribe(
      res => {
        this.personForm.reset();
        this.persons = this.persons.filter(person => res.id != person.id);
        this.persons.push(res);
      },
      err => { console.log(err) }
    )
   }

   deletePerson(person){
    this.personService.deletePerson(person.id).subscribe(
      res => {
        if (res === true) {
          this.persons.pop(person)
        } 
      },
      err => {console.log(err)}
    )
   }

   editPerson(person){
    console.log(person)
    this.personForm.setValue({
      id: person.id,
      name: person.name,
      surname: person.surname,
      age: person.age,
      country: person.country,
      state: person.state
    })
   }

}
