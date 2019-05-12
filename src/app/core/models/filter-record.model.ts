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
      params: this.params,
      owner: this.owner,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
    if (this.description) {
      output['description'] = this.description;
    }
    return output;
  }
}
