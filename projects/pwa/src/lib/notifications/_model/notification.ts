

export interface NotificationDData {
  from: string;
  NotificationD: {
    title: string;
    body: any;
  };
  collapse_key: string;
}

export interface NotificationD {
    id?: string;
    profileId?: string;
    title: string;
    body: any;
    data?: any;
    duration?: number;
    readed?: boolean;
    deleted?: boolean;

    actions?: {
      text: string;
      color: string;
      click: () => any;
    }[];
}
