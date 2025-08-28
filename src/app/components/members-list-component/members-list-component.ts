import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../services/http-service';

interface Member {
  name: string;
  status: string;
  paused: boolean;
  calls_taken: number;
  last_call_seconds_ago: number;
}
@Component({
  selector: 'app-members-list-component',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './members-list-component.html',
  styleUrl: './members-list-component.css',
})
export class MembersListComponent implements OnInit {
  @Input() endpoint!: string;
  @Input() body: any = {};
  @Input() title: string = 'اعضا';
  members: Member[] = [];
  filteredMembers: Member[] = [];

  statuses = [
    { key: 'all', label: 'همه', color: 'bg-secondary text-white' },
    { key: 'online', label: 'انلاین', color: 'bg-success text-white' },
    { key: 'offline', label: 'آفلاین', color: 'bg-danger text-white' },
    { key: 'paused', label: 'در حال استراحت', color: 'bg-warning text-dark' },
  ];
  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers(): void {
    this.httpService.post<any>(this.endpoint, this.body).subscribe({
      next: (data) => {
        const queues = data?.result?.data.queues || [];
        if (queues.length > 0) {
          this.members = queues[0].members || [];
          this.filteredMembers = [...this.members];
        }
      },
      error: (err) => {
        console.error('خطا در دریافت لیست اعضا:', err);
        this.members = [];
        this.filteredMembers = [];
      },
    });
  }

  filterMembers(statusKey: string) {
    if (statusKey === 'all') {
      this.filteredMembers = [...this.members];
    } else if (statusKey === 'online') {
      this.filteredMembers = this.members.filter((m) => m.status === 'online');
    } else if (statusKey === 'offline') {
      this.filteredMembers = this.members.filter((m) => m.status === 'offline');
    } else if (statusKey === 'paused') {
      this.filteredMembers = this.members.filter((m) => m.status === 'online' && m.paused);
    }
  }

  getCount(statusKey: string) {
    if (statusKey === 'all') return this.members.length;
    if (statusKey === 'online') return this.members.filter((m) => m.status === 'online').length;
    if (statusKey === 'offline') return this.members.filter((m) => m.status === 'offline').length;
    if (statusKey === 'paused')
      return this.members.filter((m) => m.status === 'online' && m.paused).length;
    return 0;
  }

  togglePause(member: Member, queueId: number = 1) {
    if (member.status !== 'online') {
      return;
    }
    if (member.paused) {
      this.httpService.resumeMember(member.name, queueId).subscribe({
        next: (res) => {
          console.log('Resume:', res);
          member.paused = false;
        },
        error: (err) => {
          console.error('error:', err);
        },
      });
    } else {
      this.httpService.pauseMember(member.name, queueId).subscribe({
        next: (res) => {
          console.log('Pause:', res);
          member.paused = true;
        },
        error: (err) => {
          console.error('error in pause:', err);
        },
      });
    }
  }

  getStatusLabel(member: Member): string {
    if (member.status === 'online' && member.paused) return 'در حال استراحت';
    if (member.status === 'online') return 'آنلاین';
    if (member.status === 'offline') return 'آفلاین';
    return '';
  }
}
