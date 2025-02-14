import React from 'react';
import { 
  Brain, Database, Search, Video, Github, Mail, Linkedin, ArrowRight,
  Cloud, Shield, Server, Box, MonitorCheck, Radio, FileCode, Network
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 -z-10" />
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Contact Info - Now First Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">James Han</h3>
                <p className="text-sm text-white/80">Project Developer</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm">Software Engineering Student</p>
              <p className="text-sm">University of Toronto</p>
              <p className="text-sm">Computer Science and Economics</p>
              <div className="flex gap-3 pt-3">
                <a href="mailto:hanlyu2005@gmail.com" 
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/lxyhan" 
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/jameshan27/" 
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="md:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-600 mb-4">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium">Powered by AWS Bedrock & RAG</span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              RCBC Video Archive Intelligence
            </h1>
            
            <p className="text-gray-600 mb-6">
              Revolutionizing historical video content management through advanced AI processing, semantic search, and multi-language support.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/library" 
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                View Demo
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Core AWS Services - Implemented */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Cloud className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Core Infrastructure</h3>
                <p className="text-sm text-green-600">Implemented</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">Frontend:</span> CloudFront + S3
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">API:</span> API Gateway + Lambda
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">Load Balancing:</span> ALB
              </div>
            </div>
          </div>

          {/* AI/ML Services - Implemented */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Brain className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI/ML Pipeline</h3>
                <p className="text-sm text-green-600">Implemented</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">Core:</span> Bedrock (Claude-3, Titan)
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">Analysis:</span> Rekognition
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">Language:</span> Transcribe + Translate
              </div>
            </div>
          </div>

          {/* Data Storage - Implemented */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Database className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Data Layer</h3>
                <p className="text-sm text-green-600">Implemented</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">Storage:</span> S3 + RDS
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">Search:</span> OpenSearch
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 p-2 rounded-lg">
                <span className="font-medium">Cache:</span> ElastiCache
              </div>
            </div>
          </div>

          {/* Future Features - Authentication */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Security & Auth</h3>
                <p className="text-sm text-blue-600">In Development</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">Auth:</span> Cognito + MFA
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">Secrets:</span> Secrets Manager
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">IAM:</span> Fine-grained Access
              </div>
            </div>
          </div>

          {/* Future Features - Monitoring */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MonitorCheck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Monitoring & Logs</h3>
                <p className="text-sm text-blue-600">In Development</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">Monitoring:</span> CloudWatch
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">Logging:</span> CloudTrail
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">Alerts:</span> SNS Integration
              </div>
            </div>
          </div>

          {/* Future Features - Advanced Processing */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Radio className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Advanced Features</h3>
                <p className="text-sm text-blue-600">In Development</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">Media:</span> MediaConvert
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">Audio:</span> Polly TTS
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-sky-50 p-2 rounded-lg">
                <span className="font-medium">Queue:</span> SQS + Dead Letter
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}