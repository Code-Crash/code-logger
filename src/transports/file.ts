// import * as fs from "fs";
// import { FileTransportOptionsInterface, Payload } from "../utils/types";

export async function doFile(data?: object): Promise<object> {
  // options: FileTransportOptionsInterface, data: Payload
  return data;
  // TODO: Implement file write based on file config if (it will only will be allowed in node server)
  // try {
  //   const response = await fs.appendFile(options.path, JSON.stringify(data), {}, error => {
  //     if (error) {
  //       throw new Error(`Error appending data ${error}`);
  //     } else {
  //       console.log("Data has been appended to the file.");
  //     }
  //   });
  //   console.log("file:", response);
  // } catch (error) {
  //   console.error("Error sending log data:", error);
  // }
}
