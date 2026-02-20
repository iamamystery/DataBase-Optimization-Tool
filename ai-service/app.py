"""
DBOptima AI Microservice
Python-based AI service for database query analysis and optimization
King Group Of Technology - Muhammad Jawad, CEO & Founder
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import re
import json
from datetime import datetime

app = FastAPI(
    title="DBOptima AI Service",
    description="AI-powered database query analysis and optimization",
    version="1.0.0"
)

# Data Models
class QueryAnalysisRequest(BaseModel):
    query: str
    database_type: str = "postgresql"
    schema_info: Optional[Dict[str, Any]] = None

class QueryOptimization(BaseModel):
    original_query: str
    optimized_query: str
    improvements: List[str]
    issues: List[str]
    estimated_improvement: int
    execution_plan_suggestions: List[str]
    index_recommendations: List[str]

class IndexRecommendation(BaseModel):
    table_name: str
    column_names: List[str]
    index_type: str
    reason: str
    estimated_improvement: int
    priority: str

class PerformanceMetrics(BaseModel):
    query_complexity: int
    estimated_cost: float
    full_table_scan_risk: bool
    missing_indexes: List[str]
    suggested_optimizations: List[str]

# AI Analysis Functions
def analyze_query_complexity(query: str) -> int:
    """Analyze query complexity score (1-100)"""
    complexity = 0
    
    # Check for JOINs
    join_count = len(re.findall(r'\bJOIN\b', query, re.IGNORECASE))
    complexity += join_count * 10
    
    # Check for subqueries
    subquery_count = len(re.findall(r'\bSELECT\b.*\bFROM\b.*\(.*?\bSELECT\b', query, re.IGNORECASE | re.DOTALL))
    complexity += subquery_count * 15
    
    # Check for aggregations
    agg_count = len(re.findall(r'\b(COUNT|SUM|AVG|MAX|MIN|GROUP BY)\b', query, re.IGNORECASE))
    complexity += agg_count * 8
    
    # Check for wildcards
    if '*' in query:
        complexity += 10
    
    # Check for complex WHERE clauses
    where_complexity = len(re.findall(r'\bAND\b|\bOR\b', query, re.IGNORECASE))
    complexity += where_complexity * 3
    
    return min(complexity, 100)

def detect_missing_indexes(query: str, schema_info: Optional[Dict] = None) -> List[str]:
    """Detect potentially missing indexes"""
    missing_indexes = []
    
    # Extract table and column references from WHERE clauses
    where_matches = re.findall(r'WHERE\s+(.+?)(?:ORDER|GROUP|LIMIT|$)', query, re.IGNORECASE | re.DOTALL)
    
    for where_clause in where_matches:
        # Look for column references
        column_matches = re.findall(r'(\w+)\s*=\s*', where_clause)
        for col in column_matches:
            if col not in ['id', 'ID'] and not col.startswith('_'):
                missing_indexes.append(f"Consider index on column: {col}")
    
    # Check for ORDER BY columns
    order_matches = re.findall(r'ORDER\s+BY\s+(.+?)(?:LIMIT|$)', query, re.IGNORECASE | re.DOTALL)
    for order_clause in order_matches:
        columns = re.findall(r'(\w+)', order_clause)
        for col in columns[:2]:  # Limit to first 2 columns
            if col not in ['ASC', 'DESC']:
                missing_indexes.append(f"Consider index for ORDER BY: {col}")
    
    return missing_indexes

def suggest_query_rewrites(query: str) -> List[str]:
    """Suggest query rewrites for better performance"""
    suggestions = []
    
    # Check for SELECT *
    if re.search(r'SELECT\s+\*', query, re.IGNORECASE):
        suggestions.append("Replace SELECT * with specific column names")
    
    # Check for missing LIMIT
    if not re.search(r'LIMIT\s+\d+', query, re.IGNORECASE) and 'INSERT' not in query.upper():
        suggestions.append("Add LIMIT clause to prevent large result sets")
    
    # Check for implicit joins
    if re.search(r'WHERE\s+.*=.*AND.*=.*', query, re.IGNORECASE) and 'JOIN' not in query.upper():
        suggestions.append("Consider using explicit JOIN syntax instead of comma-separated tables")
    
    # Check for DISTINCT with GROUP BY
    if re.search(r'DISTINCT', query, re.IGNORECASE) and re.search(r'GROUP\s+BY', query, re.IGNORECASE):
        suggestions.append("DISTINCT is redundant with GROUP BY - consider removing one")
    
    # Check for NOT IN
    if re.search(r'NOT\s+IN', query, re.IGNORECASE):
        suggestions.append("Consider using NOT EXISTS instead of NOT IN for better performance")
    
    return suggestions

def analyze_execution_plan_risks(query: str) -> List[str]:
    """Analyze potential execution plan risks"""
    risks = []
    
    # Check for full table scan indicators
    if re.search(r'WHERE\s+\w+\s+LIKE\s+[\'\"]%', query, re.IGNORECASE):
        risks.append("Leading wildcard LIKE pattern will cause full table scan")
    
    # Check for functions on indexed columns
    func_matches = re.findall(r'(LOWER|UPPER|SUBSTRING|DATE|TRIM)\s*\(\s*(\w+)', query, re.IGNORECASE)
    for func, col in func_matches:
        if col:
            risks.append(f"Function {func}() on column {col} prevents index usage")
    
    # Check for implicit conversions
    if re.search(r'\w+\s*=\s*[\'\"]\d+[\'\"]', query, re.IGNORECASE):
        risks.append("Implicit type conversion may prevent index usage")
    
    return risks

# API Endpoints
@app.get("/")
def root():
    return {
        "service": "DBOptima AI Service",
        "version": "1.0.0",
        "company": "King Group Of Technology",
        "founder": "Muhammad Jawad"
    }

@app.post("/analyze-query")
def analyze_query(request: QueryAnalysisRequest) -> Dict[str, Any]:
    """Analyze a SQL query and provide optimization recommendations"""
    try:
        query = request.query
        
        # Perform analysis
        complexity = analyze_query_complexity(query)
        missing_indexes = detect_missing_indexes(query, request.schema_info)
        rewrite_suggestions = suggest_query_rewrites(query)
        execution_risks = analyze_execution_plan_risks(query)
        
        # Generate optimized query (simplified version)
        optimized_query = query
        
        # Add improvements based on analysis
        improvements = []
        if "SELECT *" in query.upper():
            improvements.append("Select specific columns instead of *")
        if "LIMIT" not in query.upper():
            improvements.append("Add LIMIT clause to control result set size")
        if missing_indexes:
            improvements.extend(missing_indexes[:3])
        
        # Calculate estimated improvement
        estimated_improvement = min(30 + len(improvements) * 10 + len(missing_indexes) * 5, 95)
        
        return {
            "original_query": query,
            "optimized_query": optimized_query,
            "complexity_score": complexity,
            "improvements": improvements,
            "issues": execution_risks,
            "estimated_improvement": estimated_improvement,
            "index_recommendations": missing_indexes[:5],
            "rewrite_suggestions": rewrite_suggestions,
            "analysis_timestamp": datetime.now().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend-indexes")
def recommend_indexes(request: QueryAnalysisRequest) -> List[IndexRecommendation]:
    """Recommend indexes based on query patterns"""
    try:
        query = request.query
        recommendations = []
        
        # Extract tables and columns
        table_matches = re.findall(r'FROM\s+(\w+)|JOIN\s+(\w+)', query, re.IGNORECASE)
        tables = [t[0] or t[1] for t in table_matches if t[0] or t[1]]
        
        # Find WHERE clause columns
        where_cols = re.findall(r'WHERE\s+(\w+)\s*=', query, re.IGNORECASE)
        
        for table in set(tables):
            if where_cols:
                recommendations.append(IndexRecommendation(
                    table_name=table,
                    column_names=where_cols[:2],
                    index_type="B-tree",
                    reason=f"Frequently used in WHERE clauses",
                    estimated_improvement=min(20 + len(where_cols) * 10, 80),
                    priority="High" if len(where_cols) > 1 else "Medium"
                ))
        
        return recommendations
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/estimate-performance")
def estimate_performance(request: QueryAnalysisRequest) -> PerformanceMetrics:
    """Estimate query performance metrics"""
    try:
        query = request.query
        
        complexity = analyze_query_complexity(query)
        missing_indexes = detect_missing_indexes(query)
        risks = analyze_execution_plan_risks(query)
        suggestions = suggest_query_rewrites(query)
        
        # Estimate cost based on complexity
        estimated_cost = complexity * 1.5 + len(missing_indexes) * 10
        
        return PerformanceMetrics(
            query_complexity=complexity,
            estimated_cost=estimated_cost,
            full_table_scan_risk=any("full table scan" in risk.lower() for risk in risks),
            missing_indexes=[idx.split(":")[-1].strip() for idx in missing_indexes],
            suggested_optimizations=suggestions
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "DBOptima AI Service"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
