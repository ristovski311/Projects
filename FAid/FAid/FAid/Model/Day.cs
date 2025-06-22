using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FAid.Model;

public class Day
{
    [PrimaryKey, AutoIncrement]
    public int Id {  get; set; }
    public int StartingOffset { get; set; }
    public string Month { get; set; }
    public string Task1 {  get; set; }
    public string Task2 {  get; set; }
    public string Task3 {  get; set; }
    public string Task4 {  get; set; }
    public string Task5 {  get; set; }
    [Ignore]
    public bool Task1Empty => !String.IsNullOrEmpty(Task1);
    [Ignore]
    public bool Task2Empty => !String.IsNullOrEmpty(Task2);
    [Ignore]

    public bool Task3Empty => !String.IsNullOrEmpty(Task3);
    [Ignore]

    public bool Task4Empty => !String.IsNullOrEmpty(Task4);
    [Ignore]

    public bool Task5Empty => !String.IsNullOrEmpty(Task5);

    public Day()
    {
        Task1 = Task2 = Task3 = Task4 = Task5 = string.Empty;
        Month = string.Empty;
    }
}
