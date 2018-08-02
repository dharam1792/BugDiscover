/* JavaScript for CVSS (Common Vulnerability Scoring System)
 *   Revised by Yasuhiro (Spiegel) ARAKAWA on 2007/06/22 (for CVSS v2)
 *   This file is licensed under a CC-by license.
 *   http://www.baldanders.info/spiegel/archive/cvss/
 */

if ( typeof(CVSS2) == 'undefined' ) CVSS2 = function() {};

// --------------------------------------------------------------------
// Base Metrics Class
CVSS2.BaseMetrics = function(baseAV, baseAC, baseAu, baseC, baseI, baseA) {
    this.setBaseAV(baseAV);
    this.setBaseAC(baseAC);
    this.setBaseAu(baseAu);
    this.setBaseC(baseC);
    this.setBaseI(baseI);
    this.setBaseA(baseA);
    this.impact = this.calcImpact(this.baseC, this.baseI, this.baseA);
};
CVSS2.BaseMetrics.prototype.setBaseAV = function(val) {
    switch (val) {
    case 0 : // Local
        this.baseAV = 0.395;
        this.baseAV_vect = "AV:L";
        break;
    case 1 : // Adjacent Network
        this.baseAV = 0.646;
        this.baseAV_vect = "AV:A";
        break;
    default : // Network
        this.baseAV = 1.0;
        this.baseAV_vect = "AV:N";
        break;
    }
};
CVSS2.BaseMetrics.prototype.setBaseAC = function(val) {
    switch (val) {
    case 0 : // High
        this.baseAC = 0.35;
        this.baseAC_vect = "AC:H";
        break;
    case 1 : // Medium
        this.baseAC = 0.61;
        this.baseAC_vect = "AC:M";
        break;
    default : //Low
        this.baseAC = 0.71;
        this.baseAC_vect = "AC:L";
        break;
    }
};
CVSS2.BaseMetrics.prototype.setBaseAu = function(val) {
    switch (val) {
    case 0 : // Multiple
        this.baseAu = 0.45;
        this.baseAu_vect = "Au:M";
        break;
    case 1 : // Single
        this.baseAu = 0.56;
        this.baseAu_vect = "Au:S";
        break;
    default : // None
        this.baseAu = 0.704;
        this.baseAu_vect = "Au:N";
        break;
    }
};
CVSS2.BaseMetrics.prototype.setBaseC = function(val) {
    switch (val) {
    case 0 : // None
        this.baseC = 0.0;
        this.baseC_vect = "C:N";
        break;
    case 1 : // Partial
        this.baseC = 0.275;
        this.baseC_vect = "C:P";
        break;
    default : // Complete
        this.baseC = 0.660;
        this.baseC_vect = "C:C";
        break;
    }
};
CVSS2.BaseMetrics.prototype.setBaseI = function(val) {
    switch (val) {
    case 0 : // None
        this.baseI = 0.0;
        this.baseI_vect = "I:N";
        break;
    case 1 : // Partial
        this.baseI = 0.275;
        this.baseI_vect = "I:P";
        break;
    default : // Complete
        this.baseI = 0.660;
        this.baseI_vect = "I:C";
        break;
    }
};
CVSS2.BaseMetrics.prototype.setBaseA = function(val) {
    switch (val) {
    case 0 : // None
        this.baseA = 0.0;
        this.baseA_vect = "A:N";
        break;
    case 1 : // Partial
        this.baseA = 0.275;
        this.baseA_vect = "A:P";
        break;
    default : // Complete
        this.baseA = 0.660;
        this.baseA_vect = "A:C";
        break;
    }
};
CVSS2.BaseMetrics.prototype.calcImpact = function(baseC, baseI, baseA) {
	return 10.41 * (1 - (1-baseC) * (1-baseI) * (1-baseA));
};
CVSS2.BaseMetrics.prototype.getScore = function() {
    if ( typeof (this.impact) == "undefined" ) {
    	this.impact = this.calcImpact(this.baseC, this.baseI, this.baseA);
    }
	var f_impact = 0.0;
	if( this.impact != 0.0) {
		f_impact = 1.176;
	}
	var exploitability = 20 * this.baseAV * this.baseAC * this.baseAu;
	var score = ((0.6*this.impact) + (0.4*exploitability) - 1.5) * f_impact;
	score = score * 10.0;
	score = Math.round(score);
	return score / 10.0;
};
CVSS2.BaseMetrics.prototype.getVector = function() {
	return this.baseAV_vect + "/" + this.baseAC_vect + "/" + this.baseAu_vect + "/" + 
		this.baseC_vect + "/" + this.baseI_vect + "/" + this.baseA_vect;
};

// --------------------------------------------------------------------
// Temporal Metrics Class
CVSS2.TemporalMetrics = function(temporalE, temporalRL, temporalRC, baseMetrics) {
    this.setTemporalE(temporalE);
    this.setTemporalRL(temporalRL);
    this.setTemporalRC(temporalRC);
    this.baseMetrics = baseMetrics;
};
CVSS2.TemporalMetrics.prototype.setTemporalE = function(val) {
    switch (val) {
    case 0 : // Unproven
        this.temporalE = 0.85;
        this.temporalE_vect = "E:U";
        break;
    case 1 : // Proof of Concept
        this.temporalE = 0.90;
        this.temporalE_vect = "E:POC";
        break;
    case 2 : // Functional
        this.temporalE = 0.95;
        this.temporalE_vect = "E:F";
        break;
    case 3 : // High
        this.temporalE = 1.00;
        this.temporalE_vect = "E:H";
        break;
    default : // Not Defined
        this.temporalE = 1.00;
        this.temporalE_vect = "E:ND";
        break;
    }
};
CVSS2.TemporalMetrics.prototype.setTemporalRL = function(val) {
    switch (val) {
    case 0 : // Official Fix
        this.temporalRL = 0.87;
        this.temporalRL_vect = "RL:OF";
        break;
    case 1 : // Temporary Fix
        this.temporalRL = 0.90;
        this.temporalRL_vect = "RL:TF";
        break;
    case 2 : // Workaround
        this.temporalRL = 0.95;
        this.temporalRL_vect = "RL:W";
        break;
    case 3 : // Unavailable
        this.temporalRL = 1.00;
        this.temporalRL_vect = "RL:U";
        break;
    default : // Not Defined
        this.temporalRL = 1.00;
        this.temporalRL_vect = "RL:ND";
        break;
    }
};
CVSS2.TemporalMetrics.prototype.setTemporalRC = function(val) {
    switch (val) {
    case 0 : // Unconfirmed
        this.temporalRC = 0.90;
        this.temporalRC_vect = "RC:UC";
        break;
    case 1 : // Uncorroborated
        this.temporalRC = 0.95;
        this.temporalRC_vect = "RC:UR";
        break;
    case 2 : // Confirmed
        this.temporalRC = 1.00;
        this.temporalRC_vect = "RC:C";
        break;
    default : // Not Defined
        this.temporalRC = 1.00;
        this.temporalRC_vect = "RC:ND";
        break;
    }
};
CVSS2.TemporalMetrics.prototype.getScore = function() {
	var score = this.baseMetrics.getScore() * this.temporalE * this.temporalRL * this.temporalRC;
	score = score * 10.0;
	score = Math.round(score);
	return score / 10.0;
};
CVSS2.TemporalMetrics.prototype.getVector = function() {
	return this.temporalE_vect + "/" + this.temporalRL_vect + "/" + this.temporalRC_vect;
};

// --------------------------------------------------------------------
// Environmental Metrics Class
CVSS2.EnvironmentalMetrics = function(environmentalCD, environmentalTD, environmentalCR, environmentalIR, environmentalAR, temporalMetrics) {
    this.setEnvironmentalCD(environmentalCD);
    this.setEnvironmentalTD(environmentalTD);
    this.setEnvironmentalCR(environmentalCR);
    this.setEnvironmentalIR(environmentalIR);
    this.setEnvironmentalAR(environmentalAR);
    this.temporalMetrics = temporalMetrics;
};
CVSS2.EnvironmentalMetrics.prototype.setEnvironmentalCD = function(val) {
    switch (val) {
    case 0 : // None
        this.environmentalCD = 0.0;
        this.environmentalCD_vect = "CDP:N";
        break;
    case 1 : // Low
        this.environmentalCD = 0.1;
        this.environmentalCD_vect = "CDP:L";
        break;
    case 2 : // Low Medium
        this.environmentalCD = 0.3;
        this.environmentalCD_vect = "CDP:LM";
        break;
    case 3 : // Medium High
        this.environmentalCD = 0.4;
        this.environmentalCD_vect = "CDP:MH";
        break;
    case 4 : // High
        this.environmentalCD = 0.5;
        this.environmentalCD_vect = "CDP:H";
        break;
    default : // Not Defined
        this.environmentalCD = 0.0;
        this.environmentalCD_vect = "CDP:ND";
        break;
    }
};
CVSS2.EnvironmentalMetrics.prototype.setEnvironmentalTD = function(val) {
    switch (val) {
    case 0 : // None
        this.environmentalTD = 0.00;
        this.environmentalTD_vect = "TD:N";
        break;
    case 1 : // Low
        this.environmentalTD = 0.25;
        this.environmentalTD_vect = "TD:L";
        break;
    case 2 : // Medium
        this.environmentalTD = 0.75;
        this.environmentalTD_vect = "TD:M";
        break;
    case 3 : // High
        this.environmentalTD = 1.00;
        this.environmentalTD_vect = "TD:H";
        break;
    default : // Not Defined
        this.environmentalTD = 1.00;
        this.environmentalTD_vect = "TD:ND";
        break;
    }
};
CVSS2.EnvironmentalMetrics.prototype.setEnvironmentalCR = function(val) {
    switch (val) {
    case 0 : // Low
        this.environmentalCR = 0.50;
        this.environmentalCR_vect = "CR:L";
        break;
    case 1 : // Medium
        this.environmentalCR = 1.00;
        this.environmentalCR_vect = "CR:M";
        break;
    case 2 : // High
        this.environmentalCR = 1.51;
        this.environmentalCR_vect = "CR:H";
        break;
    default : // Not Defined
        this.environmentalCR = 1.00;
        this.environmentalCR_vect = "CR:ND";
        break;
    }
};
CVSS2.EnvironmentalMetrics.prototype.setEnvironmentalIR = function(val) {
    switch (val) {
    case 0 : // Low
        this.environmentalIR = 0.50;
        this.environmentalIR_vect = "IR:L";
        break;
    case 1 : // Medium
        this.environmentalIR = 1.00;
        this.environmentalIR_vect = "IR:M";
        break;
    case 2 : // High
        this.environmentalIR = 1.51;
        this.environmentalIR_vect = "IR:H";
        break;
    default : // Not Defined
        this.environmentalIR = 1.00;
        this.environmentalIR_vect = "IR:ND";
        break;
    }
};
CVSS2.EnvironmentalMetrics.prototype.setEnvironmentalAR = function(val) {
    switch (val) {
    case 0 : // Low
        this.environmentalAR = 0.50;
        this.environmentalAR_vect = "AR:L";
        break;
    case 1 : // Medium
        this.environmentalAR = 1.00;
        this.environmentalAR_vect = "AR:M";
        break;
    case 2 : // High
        this.environmentalAR = 1.51;
        this.environmentalAR_vect = "AR:H";
        break;
    default : // Not Defined
        this.environmentalAR = 1.00;
        this.environmentalAR_vect = "AR:ND";
        break;
    }
};
CVSS2.EnvironmentalMetrics.prototype.getScore = function() {
	var adjustedImpact = 10.41 * (1 - (1 - this.temporalMetrics.baseMetrics.baseC * this.environmentalCR) * (1 - this.temporalMetrics.baseMetrics.baseI * this.environmentalIR) * (1 - this.temporalMetrics.baseMetrics.baseA * this.environmentalAR));
	if(adjustedImpact > 10.0) {
		adjustedImpact = 10.0;
	}
	this.temporalMetrics.baseMetrics.impact = adjustedImpact;
	var adjustedTemporal = this.temporalMetrics.getScore();
	var score = (adjustedTemporal + (10.0 - adjustedTemporal) * this.environmentalCD ) * this.environmentalTD;
	score = score * 10.0;
	score = Math.round(score);
	return score / 10.0;
};
CVSS2.EnvironmentalMetrics.prototype.getVector = function() {
	return this.environmentalCD_vect + "/" + this.environmentalTD_vect + "/" + 
		this.environmentalCR_vect + "/" + this.environmentalIR_vect + "/" + this.environmentalAR_vect;
};

/* end of file */