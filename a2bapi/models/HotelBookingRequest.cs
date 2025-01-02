namespace a2bapi.Models 
{
    public class HotelBookingRequest
    {
        public string? HotelName { get; set; }
        public double HotelDistance { get; set; }
        public string? HotelIataCode { get; set; }
        public string? HotelCountryCode { get; set; }
        public int HotelRating { get; set; }
        public int NumNights { get; set; }
        public double TotalCost { get; set; }
    }
}