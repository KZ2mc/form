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
  defaultMovers: boolean;
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
  id?: string; // Add the id property to the interface
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
  children: React.ReactNode; // Add children prop
}

export interface MyAddressBlockProps {
  location: string;
  name: string;
  id?: string;
}
