using CommunityToolkit.Mvvm.ComponentModel;

namespace FAid.ViewModel;

[QueryProperty("Title", "Title")]
[QueryProperty("Description","Description")]
public partial class NoteContentViewModel : ObservableObject
{
    [ObservableProperty]
    public string title;
    [ObservableProperty]
    public string description;
}
