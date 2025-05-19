import Link from "next/link"
import { Shield, ArrowLeft } from 'lucide-react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold tracking-tight">DeepCyber<span className="text-cyan-500">Q</span></span>
          </Link>
          <Link
            href="/"
            className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 hidden md:block">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4">Secure Your Access</h2>
              <p className="text-slate-400 mb-6">
                Join our platform to get real-time alerts about the latest cyber threats, vulnerabilities, and security
                best practices.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  </div>
                  <div>
                    <h3 className="font-medium">Real-time Threat Alerts</h3>
                    <p className="text-sm text-slate-400">Get instant notifications about emerging threats</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Dashboard</h3>
                    <p className="text-sm text-slate-400">Customize your threat intelligence feed</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div>
                    <h3 className="font-medium">AI Security Assistant</h3>
                    <p className="text-sm text-slate-400">Get answers to your security questions</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-900 flex items-center justify-center text-xs font-medium"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-400 mt-2">
                  Join <span className="text-white font-medium">10,000+</span> security professionals
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
