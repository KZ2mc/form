export interface FormValues {
  [key: string]: string | boolean | string[] | Date;

  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;

  pickupStreetAddress: string;
  pickupStreetAddress2: string;
  pickupCity: string;
  pickupState: string;
  pickupZip: string;
  pickupFloorSelector: string;
  pickupElevatorCheck: boolean;
  pickupLongWalkCheck: boolean;

  stopOneStreetAddress: string;
  stopOneStreetAddress2: string;
  stopOneCity: string;
  stopOneState: string;
  stopOneZip: string;

  stopTwoStreetAddress: string;
  stopTwoStreetAddress2: string;
  stopTwoCity: string;
  stopTwoState: string;
  stopTwoZip: string;

  destStreetAddress: string;
  destStreetAddress2: string;
  destCity: string;
  destState: string;
  destZip: string;
  destFloorSelector: string;
  destElevatorCheck: boolean;
  destLongWalkCheck: boolean;

  moveSize: string;
  truck: boolean;
  packing: boolean;
  piano: boolean;
  gunSafe: boolean;
  otherHeavyItem: boolean;
  selectedHeavyItems: string[];
  inputHeavyDetails: string;
  selectedMovers: string;

  date1: string;
  timeSlot1: string;
  evnTime1: Date;
  exactTime1: Date;

  date2: string;
  timeSlot2: string;
  evnTime2: Date;
  exactTime2: Date;

  date3: string;
  timeSlot3: string;
  evnTime3: Date;
  exactTime3: Date;

  additionalInfo: string;
  acceptedTerms: boolean;
}

export interface QuoteFormValues {
  [key: string]: string | boolean | string[] | Date;
  pickupZip: string;
  destZip: string;

  moveSize: string;
  packing: boolean;

  piano: boolean;
  gunSafe: boolean;
  otherHeavyItem: boolean;

  date1: string;
  date2: string;
  date3: string;
}

export interface FlagSetters {
  setExactTimeFlag1: (value: boolean) => void;
  setEvnTimeFlag1: (value: boolean) => void;
  setExactTimeFlag2: (value: boolean) => void;
  setEvnTimeFlag2: (value: boolean) => void;
  setExactTimeFlag3: (value: boolean) => void;
  setEvnTimeFlag3: (value: boolean) => void;
}

export interface Flags {
  exactTimeFlag1: boolean;
  evnTimeFlag1: boolean;
  exactTimeFlag2: boolean;
  evnTimeFlag2: boolean;
  exactTimeFlag3: boolean;
  evnTimeFlag3: boolean;
  largeMove: boolean;
}

export interface MyDateInputProps {
  name: string;
  label: string;
  quote?: boolean;
  optional?: boolean;
  id?: string;
}

export interface MyDateAndTimeBlockProps {
  name: string;
  label: string;
  optional?: boolean;
  id: string;
  flagSetters: FlagSetters;
  flags: Flags;
}

export interface MyTextInputProps {
  label?: string;
  addclassname?: string;
  name: string;
  type: string;
  placeholder: string;
  id?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  autoComplete?: string;
  addfunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MyCheckboxProps {
  children: React.ReactNode;
  wrapperdivclassname?: string;
  name: string;
  checked?: boolean;
  wrap?: boolean;
  req?: boolean;
  id?: string;
  addfunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface MySelectProps {
  label?: string;
  name: string;
  addclassname?: string;
  wrapperdivclassname?: string;
  addfunc?: (e: React.FormEvent<HTMLSelectElement>) => void;
  id?: string;
  children: React.ReactNode;
}

export interface MyAddressBlockProps {
  location: string;
  name: string;
  id?: string;
}

export interface MyButtonProps {
  link: string;
  text: string;
  addfunc?: () => void;
  submit?: boolean;
  dark?: boolean;
}

export interface Request {
  pickup: string;
  dropoff: string;
  name: string;
  redFlag: string;
  status: string;
  date1Availability: string;
  date2Availability: string;
  date3Availability: string;
  replyText: string;
  otherHeavyItems: string;
  estDrivingTime: string;
  estDDT: string;
  estText: string;
  estTotalTime: string;
  bedrooms: number;
  distance: number;
  priority: number;
  cost: number;
  workTime: number;
  recomMovers: number;
  recomRate: number;
  estTotalCost: number;
  estTotalCostCard: number;
  isLong: boolean;
  doubleDrive: boolean;
  decision: boolean;
  pianoMove: boolean;
  offerDates: boolean;
  summerRate: boolean;
  packing: boolean;
  generalReply: boolean;
  travelTime: number | null;
  date1: string | null;
  date2: string | null;
  date3: string | null;
  alternativeDates: string[];
}
