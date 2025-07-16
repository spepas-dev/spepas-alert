import dotenv from 'dotenv';

import { Job } from '../types/job';

import { jobFunction } from './jobfunction';

dotenv.config({});
const GATEWAY_SERVICE_URL = process.env.GATEWAY_SERVICE_URL!;
const WEBADMIN_URL = process.env.WEBADMIN_URL!;
const WEBSITE_URL = process.env.WEBSITE_URL!;
const DATABASE_SERVICE_URL = process.env.DATABASE_SERVICE_URL!;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL!;
const OTP_SERVICE_URL = process.env.OTP_SERVICE_URL!;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL!;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL!;
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL!;
const USSD_SERVICE_URL = process.env.USSD_SERVICE_URL!;
export const jobs: Job[] = [
  {
    job_name: 'Gateway Service Call',
    handler: () =>
      jobFunction({
        serviceName: 'Gateway Service',
        serviceUrl: GATEWAY_SERVICE_URL
      })
  },
  {
    job_name: 'Web Admin Call',
    handler: () =>
      jobFunction({
        serviceName: 'Web Admin',
        serviceUrl: WEBADMIN_URL
      })
  },
  {
    job_name: 'Website Call',
    handler: () =>
      jobFunction({
        serviceName: 'Website',
        serviceUrl: WEBSITE_URL
      })
  },
  {
    job_name: 'Database Service Call',
    handler: () =>
      jobFunction({
        serviceName: 'Database Service',
        serviceUrl: DATABASE_SERVICE_URL
      })
  },
  {
    job_name: 'Authentication Service Call',
    handler: () =>
      jobFunction({
        serviceName: 'Authentication Service',
        serviceUrl: AUTH_SERVICE_URL
      })
  },
  {
    job_name: 'OTP Service Call',
    handler: () =>
      jobFunction({
        serviceName: 'OTP Service',
        serviceUrl: OTP_SERVICE_URL
      })
  },
  {
    job_name: 'User Service Call',
    handler: () =>
      jobFunction({
        serviceName: 'User Service',
        serviceUrl: USER_SERVICE_URL
      })
  },
  {
    job_name: 'Product Service Call',
    handler: () =>
      jobFunction({
        serviceName: 'Product Service',
        serviceUrl: PRODUCT_SERVICE_URL
      })
  },
  {
    job_name: 'Order Service Call',
    handler: () =>
      jobFunction({
        serviceName: 'Order Service',
        serviceUrl: ORDER_SERVICE_URL
      })
  },
  {
    job_name: 'USSD Service Call',
    handler: () =>
      jobFunction({
        serviceName: 'USSD Service',
        serviceUrl: USSD_SERVICE_URL
      })
  }
];
