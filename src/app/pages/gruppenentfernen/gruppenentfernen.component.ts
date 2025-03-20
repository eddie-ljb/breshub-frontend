import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../services/token.service';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Observable } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { SidebarModule } from 'primeng/sidebar';
import { MeterGroupModule, MeterItem } from 'primeng/metergroup';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule, MultiSelectSelectAllChangeEvent } from 'primeng/multiselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

interface GroupInfo {
  membersCount: Map<string, number>;
  members: Members;
  groups: Group[];
  counter: number;
}

interface Group {
  id: number;
  name: string;
}

interface Members {
  members: Map<string, string[]>;
}

interface Member {
  member: string[] | undefined;
}

interface Customer {
  id: number;
  name: string | undefined;
  memberscount: number | undefined;
  members: Member;
  status: string;
}

interface selectedValue {
  label: string;
  value: string;
}


@Component({
  selector: 'app-gruppenentfernen',
    standalone: true,
      encapsulation: ViewEncapsulation.None,
        imports: [
          CommonModule,
          FormsModule,
          RouterModule,
          HttpClientModule,
          ButtonModule,
          MenuModule,
          ToastModule,
          AvatarModule,
          BadgeModule,
          SidebarModule,
          MeterGroupModule,
          CardModule,
          TableModule,
          TagModule,
          IconFieldModule,
          InputIconModule,
          AutoCompleteModule,
          MultiSelectModule,
          InputGroupModule,
          InputGroupAddonModule,
          FloatLabelModule,
          InputTextModule
        ],
  templateUrl: './gruppenentfernen.component.html',
  styleUrl: './gruppenentfernen.component.css'
})
export class GruppenentfernenComponent {

  items: MenuItem[] = [];
  token: string = '';
  username: string = '';
  password: string = '';
  email: string = '';
  groupsCounter: number = 0;
  isSidebarVisible = false;
  value: any[] = [];
  customers: Customer[] = [];
  selectedCustomers: Customer | null = null;
  groupsOfUser: Group[] = [];
  groupMembers!: Members;
  member: string[] | undefined;
  membersCounter: Map<string, number> = new Map();
  name: string = "";
  selectedItems: selectedValue[] = [];
  selectedGroup: selectedValue[] = [];
  selectAll: boolean|null|undefined;
  allUsers: string[] = [];
  userValues: any[] = [];
  gruppenValues: any[] = [];

  constructor(private tokenService: TokenService, private http: HttpClient, private router: Router) {
    this.tokenService.getToken().subscribe(token => {
      if (token) {
        this.token = token;
        console.log('Token gefunden:', this.token);
        this.getUsername();
      } else {
        console.warn('Kein Token vorhanden.');
      }
    });
    this.setupMenu();

  }
  async onSubmit() {
    this.chooseGroup();

    const gruppenData = {
      name: this.selectedGroup[0].value,
    };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    try {
      const response = await fetch("https://breshub-engine.etiennebader.de/groups/deleteGroup", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              'accept': 'application/hal+json',
          },
          body: gruppenData.name
      });

      if (!response.ok) {
          throw new Error(`Fehler: ${response.status} ${response.statusText}`);
      }

      const result = await response;
      console.log("Erfolgreich gesendet:", result);
      
      } catch (error) {
      console.error("Fehler beim Senden der Anfrage:", error);
    }
    
  }

  search($event: AutoCompleteCompleteEvent) {
    throw new Error('Method not implemented.');
  }

  onSelectAllChange($event: MultiSelectSelectAllChangeEvent) {
    throw new Error('Method not implemented.');
  }

  setupMenu() {
    this.items = [
      {
        label: 'Menü',
        icon: 'pi pi-file',
        items: [
          { label: 'Dashboard', icon: 'pi pi-bars', command: () => this.router.navigate(['/dashboard']) },
        ]
      },
      {
        label: 'Gruppen',
        icon: 'pi pi-pencil',
        items: [
          { label: 'Übersicht', icon: 'pi pi-copy', command: () => this.router.navigate(['/gruppen-uebersicht']) },
          { label: 'Erstellen', icon: 'pi pi-plus', command: () => this.router.navigate(['/gruppen-erstellen']) },
          { label: 'Beitreten', icon: 'pi pi-user-plus', command: () => this.router.navigate(['/gruppen-beitreten']) },
          { label: 'Löschen', icon: 'pi pi-times', command: () => this.router.navigate(['/gruppen-entfernen']) }
        ]
      },
      {
        label: 'Einstellungen',
        icon: 'pi pi-cog',
        items: [
          { label: 'Optionen', icon: 'pi pi-sliders-h' },
          { label: 'Hilfe', icon: 'pi pi-info' },
          { label: 'Logout', icon: 'pi pi-sign-out',  command: () => this.logout()}
        ]
      }
    ];
  }
  async chooseGroup() {
    const gruppenData = {
      gruppen: this.selectedGroup,
      members: [""]
    };

    this.setupValues();
  }
  setupValues() {
    this.selectedItems = []; // Leere Liste, um doppelte Einträge zu vermeiden
    this.userValues = this.allUsers.map(user => ({ label: user, value: user }));
  
    const groupMembersList = this.groupMembers.members.get(this.selectedGroup[0].value) || []; // Sicherstellen, dass ein Array zurückgegeben wird
  
    for (let i = 0; i < this.allUsers.length; i++) {
      if (groupMembersList.includes(this.allUsers[i])) {  // Prüft, ob der User in der Gruppe ist
        this.selectedItems.push({
          label: this.allUsers[i],
          value: this.allUsers[i]
        });
      }
    }
  
    console.log("selected:", this.selectedItems);
  }
  

  getUsername() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    
    this.http.get< string >('https://breshub-engine.etiennebader.de/credentials/getUsername', { headers })
      .subscribe({
        next: (response) => {
          this.username = response;
          console.log('Username:', response);
          const params = new HttpParams().set('username', this.username);
    this.http.get< GroupInfo >('https://breshub-engine.etiennebader.de/groups/getGroupsOfUser', { headers, params })
    .subscribe({
      next: (response) => {
        this.groupsOfUser = response.groups;
        this.groupMembers = {
          members: new Map(Object.entries(response.members))
        };
        console.log("groupMembers:" + this.groupMembers);
        this.groupsCounter = response.counter;
        this.membersCounter = new Map(Object.entries(response.membersCount));
        console.log("✅ membersCounter (Map):", this.membersCounter);
        console.log("Groups Name: " + this.groupsOfUser.at(0)?.name);
        this.loadCustomers();
        this.setupGruppenValues();
      },
      error: (err) => console.error('Fehler beim Abrufen der Gruppen von User:', err)
      });
      this.http.get< string[] >('https://breshub-engine.etiennebader.de/credentials/getAllUser')
    .subscribe({
      next: (response) => {
        this.allUsers = response;
        console.log("allUsers:" + this.allUsers);
        this.setupValues();
      },
      error: (err) => console.error('Fehler beim Abrufen der User:', err)
      });
      },
      error: (err) => console.error('Fehler beim Abrufen des Nutzernamens:', err)
      });
  }

  onNew() {
    console.log('Neue Datei erstellen');
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/']);
  }

  setupGruppenValues() {
    this.gruppenValues = [];
    for(let i=0; i < this.groupsOfUser.length; i++) {
      this.gruppenValues[i] = { label: this.groupsOfUser[i].name, value: this.groupsOfUser[i].name};
      console.log("group:" + this.groupsOfUser[i].name);
    }
  }

  loadCustomers() {
    this.customers = [];      
    this.groupsOfUser.forEach((group: { name: string; id: any; }) => {
      console.log("🔹 Gruppenname:", group.name);
      let membersList: string[] | undefined = undefined;
if (this.groupMembers?.members instanceof Map) {
  membersList = this.groupMembers.members.get(group.name);
}
    const memberCount = this.membersCounter.get(group.name);
    console.log(`📊 Mitgliederanzahl für ${group.name}:`, memberCount);
      console.log("gruppenname:" + group.name);
      console.log("gruppemitglieder:" + this.groupMembers?.members.get(group.name));
      this.customers.push({
        id: group.id, // Falls ID benötigt wird, aus `group` nehmen
        name: group.name,
        memberscount: this.membersCounter.get(group.name), // Falls dynamisch, anpassen
        members: { member: membersList },
        status: 'active'
      });
    });
    console.log(this.customers);
  }


  getSeverity(status: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (status.toLowerCase()) {
        case 'active':
            return 'success';
        case 'inactive':
            return 'danger';
        case 'pending':
            return 'warn';
        default:
            return 'info'; // Hier ist 'info' erlaubt
    }
  }
  onFilterGlobal(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
        dt.filterGlobal(inputElement.value, 'contains');
    }
  }


}