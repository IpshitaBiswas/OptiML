import { ReactNode, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BarChart2, 
  PieChart, 
  LineChart, 
  BarChart, 
  Brain, 
  FileText, 
  Home,
  LogOut
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const companyName = sessionStorage.getItem("companyName") || "Your Company";

  // Check if analysis is complete
  useEffect(() => {
    const isAnalysisComplete = sessionStorage.getItem("isAnalysisComplete");
    if (isAnalysisComplete !== "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("companyName");
    sessionStorage.removeItem("isAnalysisComplete");
    
    // Redirect to home
    navigate("/");
  };

  const sidebarLinks = [
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Financial Dashboard",
      path: "/financial-dashboard",
    },
    {
      icon: <PieChart className="w-5 h-5" />,
      label: "EDA Dashboard",
      path: "/eda-dashboard",
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      label: "Competitor Analysis",
      path: "/competitor-analysis",
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      label: "KPI Comparisons",
      path: "/kpi-comparison",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      label: "AI Insights",
      path: "/ai-insights",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Reports",
      path: "/reports",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-100 via-purple-50 to-white">
      {/* Dashboard Navbar */}
      <header className="bg-white/80 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto py-3 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-optiml-purple">
              OptiML
            </Link>
          </div>
          <div className="text-3xl font-bold text-center text-optiml-purple">
            {companyName}
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-optiml-purple flex items-center"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r shadow-sm hidden md:block">
          <div className="p-4">
            <Link 
              to="/"
              className="flex items-center py-2 px-3 text-optiml-purple hover:bg-optiml-light rounded-md"
            >
              <Home className="w-5 h-5 mr-3" />
              <span>Home</span>
            </Link>
            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2 px-3">
                Dashboards
              </h3>
              <ul>
                {sidebarLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className={`flex items-center py-2 px-3 rounded-md my-1 ${
                        window.location.pathname === link.path
                          ? "bg-optiml-light text-optiml-purple font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
