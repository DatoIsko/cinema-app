import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-seats-dialog',
  templateUrl: './seats-dialog.component.html',
  styleUrls: ['./seats-dialog.component.scss']
})
export class SeatsDialogComponent implements OnInit {
  places: any[];
  selected: any[] = [];
  movieTitle = 'Movie Title';
  startTime = '';

  ticketPrice = 0;
  totalPrice = 0;
  currency = 'USD';

  constructor(
    public dialogRef: MatDialogRef<SeatsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ticketPrice = data.ticketPrice;
    this.movieTitle = data.movieTitle;
    this.startTime = data.startTime;
    this.places = Array.from(data.places, (row: any[]) => {
      return Array.from(row, (col) => {
        col.selected = false;
        return col;
      });
    });
  }

  ngOnInit(): void {
  }

  onSubbmit(): void {
    this.dialogRef.close(this.selected);
  }

  // clear handler
  clearSelected() {
    this.selected = [];
  }
  // click handler
  seatClicked(row, seat) {
    console.log(row, seat);

    // const seat = this.places[row][col];
    if (seat.isFree) {
      if (seat.selected) {
        // seat already selected, remove
        this.selected = this.selected.filter((el) => seat._id === el._id);
      } else {
        // push to selected array only if it is not reserved
        this.selected.push({ row, seat });
      }
      seat.selected = !seat.selected;
    }
  }
  // Buy button handler
  showSelected() {
    if (this.selected.length > 0) {
      alert(`Selected Seats: ${this.selected} \n Total: ${this.ticketPrice * this.selected.length}`);
    } else {
      alert('No seats selected!');
    }
  }
}
