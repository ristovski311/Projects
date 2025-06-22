using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Maui.Controls.Platform.Compatibility;
using System.Collections.ObjectModel;

namespace FAid.ViewModel;

public partial class CalendarMonthsViewModel : ObservableObject
{
    [RelayCommand]
    public async Task TapMonth(string s)
    {
        await Shell.Current.GoToAsync($"{nameof(CalendarDetailPage)}?Title={s}");
    }
}
