import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
// import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
