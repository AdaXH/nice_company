import request from '@/util/request';

export async function testApi() {
  return request('/api/getUser');
}
