

export class EmailTemplate {
  key: string;
  template: string;
  title: string;
  args: { [id: string]: string };
}

export class RenderEmailRequest {
  name: string;
  data: any;
  titleData: any;

}

export class RenderEmail {
  title: string;
  body: string;
}


export class SendMailRequest {
  to: string;
  template: string;
  data?: any;
  titleData?: any
}
