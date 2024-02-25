import axios from "axios";

class DniService {
  /*
   * Consulta a la lista de contribuyentes
   * { apellidos_nombres, nombre, numeroDocumento }
   */
  static async request(dni) {
    return searchDni(dni);
  }
}

async function searchDni(dni) {
  var response = await axios.get(process.env.VUE_APP_DNI_API + dni);
  return response.data;
}

export default searchDni;
export { DniService, searchDni };
