// @Injectable()
// export class HashtagService {
//   constructor(private readonly backendDataAccessService: BackendDataAccessService) {}
// // z
//   async createHashtag(input: HashtagInput) {
//     const hashtag = await this.backendDataAccessService.createHashtag(input);
//     return new Hashtag(hashtag.id, hashtag.name);
//   }

//   async deleteHashtag(id: string) {
//     await this.backendDataAccessService.deleteHashtag(id);


//   async updateHashtag(id: string, input: Partial<HashtagInput>) {
//     const updatedHashtag = await this.backendDataAccessService.updateHashtag(id, input);
//     return new Hashtag(updatedHashtag.id, updatedHashtag.name);
//   }

//   async getHashtagById(id: string) {
//     const hashtag = await this.backendDataAccessService.getHashtagById(id);
//     return new Hashtag(hashtag.id, hashtag.name);
//   }

//   async getAllHashtags() {
//     const hashtags = await this.backendDataAccessService.getAllHashtags();
//     return hashtags.map(hashtag => new Hashtag(hashtag.id, hashtag.name));
//   }
// }
