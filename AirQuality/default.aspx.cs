using System;
using System.Net;
using System.Text;
using ChoETL;

namespace AirQuality
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var date = Request.QueryString["date"];
            if (string.IsNullOrEmpty(date))
            {
                date = DateTime.Now.AddDays(-1).ToString("dd/MM/yyyy");
            }
            var wc = new WebClient();
            var strUrl =
                "http://www.airqualityni.co.uk/data/download-data?ds[p][sqid]=76139&ds[p][format]=csv&ds[p][type]=Daily&ds[p][current-selector]=site&ds[s][parameter-group][0]=4&ds[s][measurement-type][0]=step1&ds[s][pollutant][0]=O3&ds[s][pollutant][1]=NO&ds[s][pollutant][2]=NO2&ds[s][pollutant][3]=NOXasNO2&ds[s][pollutant][4]=SO2&ds[s][pollutant][5]=CO&ds[s][pollutant][6]=GE10&ds[s][pollutant][7]=NV10&ds[s][pollutant][8]=V10&ds[s][pollutant][9]=PM25&ds[s][pollutant][10]=NV25&ds[s][pollutant][11]=V25&ds[s][pollutant][12]=GR10&ds[s][pollutant][13]=GR25&ds[s][pollutant][14]=13BDIENE&ds[s][pollutant][15]=BENZENE&ds[s][pollutant][16]=M_DIR&ds[s][pollutant][17]=M_SPED&ds[s][pollutant][18]=M_T&ds[s][statistic-type][0]=12&ds[s][date-range][start]={0}&ds[s][date-range][finish]={1}&ds[s][region][0]=415&ds[s][region][1]=416&ds[s][region][2]=419&ds[s][region][3]=421&ds[s][region][4]=425&ds[s][region][5]=426&ds[s][region][6]=428&ds[s][region][7]=430&ds[s][region][8]=431&ds[s][region][9]=434&ds[s][region][10]=435&ds[s][region][11]=436&ds[s][region][12]=438&ds[s][site][0]=9999";

            strUrl = string.Format(strUrl, date, date);
            var strCsv = wc.DownloadString(strUrl);
            var sb = new StringBuilder();
            using (var p = ChoCSVReader.LoadText(strCsv)
                .WithFirstLineHeader()
            )
            {
                using (var w = new ChoJSONWriter(sb))
                    w.Write(p);
            }

            Response.ContentType = "application/json";
            Response.AppendHeader("Access-Control-Allow-Origin", "*");
            Response.Write(sb.ToString());
        }
    }
}