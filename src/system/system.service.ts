import { Injectable } from '@nestjs/common';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class SystemService {

    public dirStream(tar, source) {
        const stream = new tar.Stream();

    }
    private depStream(stream, path) {
    }
}
