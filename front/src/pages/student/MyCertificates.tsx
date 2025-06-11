import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Download, Share2, Calendar } from "lucide-react";

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/certificates")
      .then((res) => {
        setCertificates(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching certificates:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">My Certificates</h1>
          <p className="text-slate-600 text-lg">Your earned certificates and achievements</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Certificates</p>
                  <p className="text-3xl font-bold text-yellow-600">{certificates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">This Year</p>
                  <p className="text-3xl font-bold text-green-600">
                    {
                      certificates.filter(cert => new Date(cert.issueDate).getFullYear() === new Date().getFullYear()).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Share2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Shared</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {
                    certificates.filter(cert => cert.shared).length
                    }
                    </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading certificates...</p>
            ) : certificates.length === 0 ? (
              <div className="text-center py-16">
                <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No certificates yet</h3>
                <p className="text-slate-500">Complete courses to earn certificates</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                          <Award className="h-8 w-8 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">{cert.courseName}</h3>
                          <p className="text-slate-600">Instructor: {cert.instructor}</p>
                          <p className="text-sm text-slate-500">Certificate ID: {cert.certificateId}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Grade: {cert.grade}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-600">
                        <p>Issued on: {new Date(cert.issueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                        </Button>
                        <Button size="sm" onClick={() => window.open(cert.downloadUrl, "_blank")}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyCertificates;
