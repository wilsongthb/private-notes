function ticketUrl(saleId) {
  return `${process.env.VUE_APP_API_URL}print/store/sales-ticket/${saleId}`;
}

export { ticketUrl };
