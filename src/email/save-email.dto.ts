export class SaveEmailDto {
  subject: string;
  to: string;
  body: string;
  idempotencyKey: string;
}
