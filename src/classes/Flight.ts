import Time from './time';

export interface AircraftType {
  iatamain: string;
  iatasub: string;
}

export interface CheckinAllocation {
  startTime: Date;
  endTime: Date;
  rows: Array<Row>;
}

export interface Row {
  position: number;
  desks: Array<Desk>;
}

export interface Desk {
  position: number;
  checkinClass: CheckinClass;
}

export interface CheckinClass {
  code: string;
  description: string;
}

export class Flight {
  public id: number;
  public flightName: string;
  public scheduleDate: Date;
  public isArrival: boolean;
  public flightNumber: number;
  public prefixIATA: string;
  public prefixICAO: string;
  public scheduleTime: Time | undefined;
  public serviceType: string;
  public mainFlight: string;
  public codeshares: Array<string>;
  public estimatedLandingTime: Time | undefined;
  public actualLandingTime: Time | undefined;
  public publicEstimatedOffBlockTime: Time | undefined;
  public actualOffBlockTime: Date | undefined;
  public publicFlightState: Array<string>;
  public route: Array<string>;
  public terminal: number;
  public gate: string;
  public baggageClaim: Array<string>;
  public expectedTimeOnBelt: Time;
  public checkinAllocations: Array<CheckinAllocation>;
  public checkinAllocationRemarks: string;
  public transferPositions: Array<number>;
  public aircraftType: AircraftType;
  public aircraftRegistration: string;
  public airlineCode: number;
  public expectedTimeGateOpen: Date;
  public expectedTimeBoarding: Date;
  public expectedTimeGateClosing: Date;

  private getScheduleDate(dateInput: string): Date {
    const dateSplit = dateInput.split('-').map(part => parseInt(part, 10));
    return new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
  }

  private getTime(timeInput: string | null): Time | undefined {
    if (!timeInput) { return; }
    const timeSplit = timeInput.split(':').map(part => parseInt(part, 10));
    return new Time(timeSplit[0], timeSplit[1], timeSplit[2]);
  }

  private setCheckinAllocations(checkinAllocations) {
    if (!checkinAllocations) {
      return;
    }
    this.checkinAllocationRemarks = checkinAllocations.remarks;
    this.checkinAllocations = checkinAllocations.checkinAllocations.map(
      allocation => ({
        startTime: new Date(allocation.startTime),
        endTime: new Date(allocation.endTime),
        rows: allocation.rows.rows.map(row => ({
          position: parseInt(row.position, 10),
          desks: row.desks.desks,
        })),
      }),
    );
  }

  constructor(flightInfo: any) {
    this.id = flightInfo.id;

    // the "normal" properties
    this.flightName = flightInfo.flightName;
    this.flightNumber = flightInfo.flightNumber;
    this.prefixIATA = flightInfo.prefixIATA;
    this.prefixICAO = flightInfo.prefixICAO;
    this.serviceType = flightInfo.serviceType;
    this.mainFlight = flightInfo.mainFlight;
    this.terminal = flightInfo.terminal;
    this.gate = flightInfo.gate;
    this.expectedTimeOnBelt = flightInfo.expectedTimeOnBelt;
    this.setCheckinAllocations(flightInfo.checkinAllocations);
    this.aircraftType = flightInfo.aircraftType;
    this.aircraftRegistration = flightInfo.aircraftRegistration;
    this.airlineCode = flightInfo.airlineCode;

    // the special properties
    this.scheduleDate = this.getScheduleDate(flightInfo.scheduleDate);
    this.isArrival = flightInfo.flightDirection === 'A';

    // the arrays
    this.codeshares =  [];
    if (flightInfo.codeshares) {
      this.codeshares = flightInfo.codeshares.codeshares;
    }
    this.publicFlightState = [];
    if (flightInfo.publicFlightState) {
      this.publicFlightState = flightInfo.publicFlightState.flightStates;
    }
    this.route = [];
    if (flightInfo.route) {
      this.route = flightInfo.route.destinations;
    }
    this.baggageClaim = [];
    if (flightInfo.baggageClaim) {
      this.baggageClaim = flightInfo.baggageClaim.belts;
    }
    this.transferPositions = [];
    if (flightInfo.transferPositions) {
      this.transferPositions = flightInfo.transferPositions.transferPositions;
    }

    // the times
    this.scheduleTime = this.getTime(flightInfo.scheduleTime);
    this.estimatedLandingTime = this.getTime(flightInfo.estimatedLandingTime);
    this.actualLandingTime = this.getTime(flightInfo.actualLandingTime);
    this.publicEstimatedOffBlockTime = this.getTime(flightInfo.publicEstimatedOffBlockTime);

    // the dates
    if (flightInfo.actualOffBlockTime) {
      this.actualOffBlockTime = new Date(flightInfo.actualOffBlockTime);
    }
    if (flightInfo.expectedTimeGateOpen) {
      this.expectedTimeGateOpen = new Date(flightInfo.expectedTimeGateOpen);
    }
    if (flightInfo.expectedTimeBoarding) {
      this.expectedTimeBoarding = new Date(flightInfo.expectedTimeBoarding);
    }
    if (flightInfo.expectedTimeGateClosing) {
      this.expectedTimeGateClosing = new Date(flightInfo.expectedTimeGateClosing);
    }
  }
}
