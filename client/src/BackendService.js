import http from "src/utils/http";

class BackendService {
  static async getNotes(params) {
    return (await http.get("api/notes/", { params })).data;
  }

  static async getNote(id) {
    return (await http.get(`api/notes/${id}/`)).data;
  }

  static async saveNote(reg) {
    if (reg.id === undefined || reg.id === null) {
      return (await http.post("api/notes/", reg)).data;
    } else {
      return (await http.put(`api/notes/${reg.id}/`, reg)).data;
    }
  }

  static async deleteNote(id) {
    return (await http.delete(`api/notes/${id}/`)).data;
  }

  static async getContacts(params) {
    return (await http.get("api/contacts/", { params })).data;
  }

  static async getContact(id) {
    return (await http.get(`api/contacts/${id}/`)).data;
  }

  static async saveContact(reg) {
    if (reg.id === undefined || reg.id === null) {
      return (await http.post("api/contacts/", reg)).data;
    } else {
      return (await http.put(`api/contacts/${reg.id}/`, reg)).data;
    }
  }

  static async deleteContact(id) {
    return (await http.delete(`api/contacts/${id}/`)).data;
  }

  static async getPrograms(params) {
    return (await http.get("api/programs/", { params })).data;
  }

  static async getProgram(id) {
    return (await http.get(`api/programs/${id}/`)).data;
  }

  static async saveProgram(reg) {
    if (reg.id === undefined || reg.id === null) {
      return (await http.post("api/programs/", reg)).data;
    } else {
      return (await http.put(`api/programs/${reg.id}/`, reg)).data;
    }
  }

  static async deleteProgram(id) {
    return (await http.delete(`api/programs/${id}/`)).data;
  }

  static async getNoteActivities(params) {
    return (await http.get("api/note-activities/", { params })).data;
  }

  static async getNoteActivity(id) {
    return (await http.get(`api/note-activities/${id}/`)).data;
  }

  static async saveNoteActivity(reg) {
    if (reg.id === undefined || reg.id === null) {
      return (await http.post("api/note-activities/", reg)).data;
    } else {
      return (await http.put(`api/note-activities/${reg.id}/`, reg)).data;
    }
  }

  static async deleteNoteActivity(id) {
    return (await http.delete(`api/note-activities/${id}/`)).data;
  }

  static async getPayments(params) {
    return (await http.get("api/payments/", { params })).data;
  }

  static async getPayment(id) {
    return (await http.get(`api/payments/${id}/`)).data;
  }

  static async savePayment(reg) {
    if (reg.id === undefined || reg.id === null) {
      return (await http.post("api/payments/", reg)).data;
    } else {
      return (await http.put(`api/payments/${reg.id}/`, reg)).data;
    }
  }

  static async deletePayment(id) {
    return (await http.delete(`api/payments/${id}/`)).data;
  }

  static async getAnnotations(params) {
    return (await http.get("api/annotations/", { params })).data;
  }

  static async getAnnotation(id) {
    return (await http.get(`api/annotations/${id}/`)).data;
  }

  static async saveAnnotation(reg) {
    // if (reg.program_id == null) {
    //   delete reg.program_id;
    // }
    if (reg.id === undefined || reg.id === null) {
      return (await http.post("api/annotations/", reg)).data;
    } else {
      return (await http.put(`api/annotations/${reg.id}/`, reg)).data;
    }
  }

  static async deleteAnnotation(id) {
    return (await http.delete(`api/annotations/${id}/`)).data;
  }
}

export default BackendService;
export { BackendService };
