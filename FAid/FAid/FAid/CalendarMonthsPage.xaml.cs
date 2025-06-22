using FAid.ViewModel;

namespace FAid;

public partial class CalendarMonthsPage : ContentPage
{
	public CalendarMonthsPage(CalendarMonthsViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
	}
}