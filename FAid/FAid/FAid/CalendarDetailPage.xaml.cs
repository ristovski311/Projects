using FAid.ViewModel;

namespace FAid;

public partial class CalendarDetailPage : ContentPage
{
	public CalendarDetailPage(CalendarDetailViewModel vm)
	{
		InitializeComponent();
		BindingContext = vm;
    }
}