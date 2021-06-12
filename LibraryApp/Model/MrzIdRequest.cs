using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryApp.Model
{
    public class MrzIdRequest
    {
        public bool returnFullDocumentImage { get; set; }
        public bool returnFaceImage { get; set; }
        public bool returnSignatureImage { get; set; }
        public string imageSource { get; set; }
    }
}
