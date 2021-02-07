import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from '../config/config.service';
import { identity } from 'rxjs';

interface DataJsonResponse {
  title: string;
  description: string;
}

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  async createSampleIndex() {
    //?for first boot
    //? Check if index already exists
    const checkIndex = await this.esService.indices.exists({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
    });
    //? IF index doesnot exist
    if (checkIndex.statusCode === 404) {
      await this.esService.index({
        index: this.configService.get('ELASTICSEARCH_INDEX'),
        body: {
          title: 'sample',
          description:
            'this a sample data  inserted when server was run for the first time',
        },
      });
      //? For index refresh
      await this.esService.indices.refresh({
        index: this.configService.get('ELASTICSEARCH_INDEX'),
      });
    }
  }
  //?Add document
  async createIndex(id, body) {
    const result = await this.esService.index({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      id: id,
      body: body,
    });

    return result;
  }

  //?search using title
  async search(search: string) {
    const results = [];
    const { body } = await this.esService.search({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body: {
        size: 12,
        query: {
          match: { title: search },
        },
      },
    });
    const hits = body.hits.hits;
    hits.map((item) => {
      results.push(item);
    });

    return { results, total: body.hits.total.value };
  }

  //?update document using id
  async updateDocument(id: string, changeObj) {
    await this.esService.update({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      id: id,
      body: {
        doc: changeObj,
      },
    });
  }
}
