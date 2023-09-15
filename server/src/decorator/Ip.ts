import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Ip = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const headers = req.headers;
    let ip =
      headers['x-forwarded-for'] ||
      headers['x-real-ip'] ||
      req.ip ||
      req.connection?.remoteAddress || // 判断 connection 的远程 IP
      req.socket?.remoteAddress || // 判断后端的 socket 的 IP
      req.connection?.socket?.remoteAddress ||
      '';

    if (ip) {
      const ips = ip.match(/(\d+\.\d+\.\d+\.\d+).*/) || [];
      const realIp = ips[1] || '127.0.0.1';
      ip = realIp.replace('::ffff:', '');
    }

    return ip;
  },
);
