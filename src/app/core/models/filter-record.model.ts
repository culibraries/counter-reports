export class FilterRecord {
  name: string;
  description: string;
  params: string;
  owner: string;
  created_at: string;
  updated_at: string;

  constructor(
    name: string,
    description: string,
    params: string,
    owner: string,
    created_at: string,
    updated_at: string
  ) {
    this.name = name;
    this.description = description;
    this.params = params;
    this.owner = owner;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJson() {
    let output = {};
    output = {
      name: this.name,
      description: this.description,
      owner: this.owner,
      params: this.params,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
    // if (this.name) {
    //   output['name'] = this.name;
    // }
    // if (this.description) {
    //   output['description'] = this.description;
    // }

    // if (this.owner) {
    //   output['owner'] = this.owner;
    // }

    // if (this.params) {
    //   output['params'] = this.params;
    // }

    // if (this.created_at) {
    //   output['created_at'] = this.created_at;
    // }

    // if (this.updated_at) {
    //   output['updated_at'] = this.updated_at;
    // }

    return output;
  }
}
