interface ResponseInstance {
  statusCode?: number;
  success: boolean;
  message: string;
  metadata?: unknown | any;
  reasonStatusCode?: string;
}
