"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Download, FileText, BarChart3, Target, Activity, Shield } from "lucide-react";

export const UnifiedReportGenerator: React.FC = () => {
  const [reportType, setReportType] = useState<'threat-intelligence' | 'bcm'>('threat-intelligence');
  const [reportFormat, setReportFormat] = useState<'executive' | 'technical' | 'ioc'>('executive');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('24h');
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate appropriate report content based on type
      let reportContent = '';
      
      if (reportType === 'threat-intelligence') {
        reportContent = generateThreatIntelligenceReport();
      } else {
        reportContent = generateBCMReport();
      }
      
      // Create and download the report
      const blob = new Blob([reportContent], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-${reportFormat}-report-${new Date().toISOString().split('T')[0]}.md`;
      a.click();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateThreatIntelligenceReport = () => {
    return `# Threat Intelligence Report

**Report Type:** ${reportFormat.toUpperCase()}
**Generated:** ${new Date().toLocaleString()}
**Time Range:** ${timeRange}

## Executive Summary

Our threat intelligence analysis for the ${timeRange} period reveals:

- **Active Threats:** 39 currently monitored
- **IOCs Detected:** 1,446 indicators processed
- **Feed Status:** 14/15 sources operational
- **Threat Level:** 94/100 (High)

## Key Findings

### Critical Threats
- Advanced persistent threat (APT) activity detected
- Increased phishing campaigns targeting finance sector
- New malware variants observed: TrickBot, Emotet

### IOC Analysis
- 15 critical IOCs requiring immediate attention
- 32 medium-risk indicators under investigation
- 18 low-risk indicators archived

## Recommendations

1. **Immediate Actions:**
   - Block critical IOCs at network perimeter
   - Enhance email security filters
   - Update security awareness training

2. **Medium-term Initiatives:**
   - Implement zero-trust architecture
   - Upgrade SIEM correlation rules
   - Conduct threat hunting exercises

3. **Long-term Strategy:**
   - Expand threat intelligence feeds
   - Develop custom detection rules
   - Strengthen incident response capabilities

## MITRE ATT&CK Mapping

- **T1566.001:** Spearphishing Attachment (15 incidents)
- **T1486:** Data Encrypted for Impact (12 incidents)
- **T1027:** Obfuscated Files or Information (8 incidents)

---
*Generated by Threat Intelligence Dashboard*`;
  };

  const generateBCMReport = () => {
    return `# Business Continuity Management Report

**Report Type:** ${reportFormat.toUpperCase()}
**Generated:** ${new Date().toLocaleString()}
**Time Range:** ${timeRange}

## Executive Summary

Our BCM impact analysis for the ${timeRange} period shows:

- **Total IOCs Analyzed:** 1,247
- **Critical Business Impact:** 23 incidents
- **Risk Score:** 7.2/10 (High)
- **Sectors Monitored:** 8 active sectors

## Risk Distribution

### High Risk (15 incidents)
- Finance sector: 8 incidents
- Healthcare: 4 incidents
- Technology: 3 incidents

### Medium Risk (32 incidents)
- Manufacturing: 12 incidents
- Retail: 10 incidents
- Government: 10 incidents

### Low Risk (18 incidents)
- Education: 9 incidents
- Non-profit: 9 incidents

## Sector Analysis

### Finance Sector
- **Threats Detected:** 28
- **Impact Level:** High
- **Primary Concerns:** Payment fraud, data breaches
- **Recommendations:** Enhanced monitoring, PCI compliance review

### Healthcare Sector
- **Threats Detected:** 19
- **Impact Level:** Medium
- **Primary Concerns:** HIPAA violations, ransomware
- **Recommendations:** Backup verification, staff training

### Technology Sector
- **Threats Detected:** 22
- **Impact Level:** High
- **Primary Concerns:** IP theft, supply chain attacks
- **Recommendations:** Code security review, vendor assessment

## Business Impact Assessment

### Financial Impact
- Estimated potential losses: $2.1M
- Recovery costs: $450K
- Regulatory fines risk: $300K

### Operational Impact
- Service disruption risk: 15%
- Customer impact potential: Medium
- Reputation damage risk: High

## Recommendations

1. **Immediate Actions:**
   - Implement crisis communication plan
   - Activate backup systems testing
   - Review cyber insurance coverage

2. **Strategic Initiatives:**
   - Develop sector-specific playbooks
   - Enhance third-party risk management
   - Invest in resilience technologies

3. **Compliance & Governance:**
   - Update BCM policies
   - Conduct board-level reporting
   - Schedule quarterly reviews

---
*Generated by BCM Impact Analysis System*`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Report Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Report Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Report Type</label>
          <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="threat-intelligence">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Threat Intelligence
                </div>
              </SelectItem>
              <SelectItem value="bcm">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  BCM Impact Analysis
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Report Format Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Report Format</label>
          <Select value={reportFormat} onValueChange={(value: any) => setReportFormat(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="executive">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Executive Summary
                </div>
              </SelectItem>
              <SelectItem value="technical">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Technical Report
                </div>
              </SelectItem>
              {reportType === 'threat-intelligence' && (
                <SelectItem value="ioc">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    IOC Report
                  </div>
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Time Range Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Time Range</label>
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Generate Button */}
        <Button 
          onClick={generateReport} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </>
          )}
        </Button>

        {/* Report Preview */}
        <div className="text-xs text-muted-foreground">
          <p>Report will include:</p>
          <ul className="mt-1 space-y-1">
            <li>• Executive summary</li>
            <li>• Key findings & metrics</li>
            <li>• Risk assessment</li>
            <li>• Recommendations</li>
            {reportType === 'threat-intelligence' && (
              <li>• MITRE ATT&CK mapping</li>
            )}
            {reportType === 'bcm' && (
              <li>• Business impact analysis</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedReportGenerator; 