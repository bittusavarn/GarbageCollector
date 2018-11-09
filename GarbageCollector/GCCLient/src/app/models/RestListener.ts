import { ResponseTemplate } from './ResponseTemplate';

export interface RestListener {
    onSuccess(response: ResponseTemplate, request: any, requestType: Number);
    onFailure(err: any, request: any, requestType: Number);
}
