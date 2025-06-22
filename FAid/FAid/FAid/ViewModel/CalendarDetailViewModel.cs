using CommunityToolkit.Mvvm.ComponentModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FAid.ViewModel;

[QueryProperty("Title", "Title")]
public partial class CalendarDetailViewModel : ObservableObject
{
    [ObservableProperty]
    public string title;
}
